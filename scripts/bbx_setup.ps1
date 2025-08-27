<# BrickBox Token (BBX) Windows setup — asks 3 things:
   1) PUBLIC URL to bbx metadata JSON on Supabase
   2) three PUBLIC KEYS for a 2-of-3 multisig
   3) run MAINNET now? (y/n)   (optional LOCK to cap supply)
#>
param([int]$Decimals=9,[string]$ProgramId="TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb")
$ErrorActionPreference="Stop"; $outFile=Join-Path (Get-Location) "bbx_out.txt"
function H($t){Write-Host "`n=== $t ===" -ForegroundColor Cyan}
function AddPATH($p){if(($env:PATH -split ";") -notcontains $p){setx PATH "$env:PATH;$p" >$null}}

function Ensure-Solana{
  try{solana --version|Out-Null;return}catch{}
  $url="https://release.anza.xyz/v3.0.0/agave-install-init-x86_64-pc-windows-msvc.exe"
  $tmp="C:\agave-install-tmp"; New-Item -Force -ItemType Directory -Path $tmp|Out-Null
  $exe=Join-Path $tmp "agave-install-init.exe"; curl $url -o $exe; & $exe "v3.0.0"
  $bin="$HOME\.local\share\solana\install\active_release\bin"; if(Test-Path $bin){AddPATH $bin}
  solana --version
}
function Ensure-Rust{
  try{cargo --version|Out-Null;return}catch{}
  iwr https://win.rustup.rs -UseBasicParsing | iex
  $cargo="$HOME\.cargo\bin"; if(Test-Path $cargo){AddPATH $cargo}; cargo --version
}
function Ensure-Spl{
  try{spl-token --version|Out-Null;return}catch{}
  cargo install spl-token-cli; spl-token --version
}
function Net($n){ if($n -eq "devnet"){solana config set -ud|Out-Null}else{solana config set -um|Out-Null}; solana config get }
function Key($name){$d="$HOME\.config\solana";New-Item -Force -ItemType Directory -Path $d|Out-Null;$p=Join-Path $d "$name.json"; if(-not(Test-Path $p)){solana-keygen new --outfile $p -s|Out-Null}; solana config set --keypair $p|Out-Null; return $p}
function CreateMint($label){
  H "[$label] Create Token-2022 mint"
  $o=& spl-token --program-id $ProgramId create-token --decimals $Decimals --enable-metadata 2>&1
  $t=($o|Out-String); if($t -match "Mint:\s+([A-Za-z0-9]+)"){return $Matches[1]}
  if($t -match "Creating token\s+([A-Za-z0-9]+)"){return $Matches[1]}
  Write-Host $t -Foreground Yellow; return (Read-Host "Paste the MINT printed above")
}
function SetMeta($mint,$uri){
  H "Set metadata"; try{
    spl-token update-metadata $mint name  "BrickBox Token"
    spl-token update-metadata $mint symbol "BBX"
    spl-token update-metadata $mint uri   $uri
  }catch{ cargo install spl-token-cli --force; spl-token update-metadata $mint name "BrickBox Token"; spl-token update-metadata $mint symbol "BBX"; spl-token update-metadata $mint uri $uri }
}
function MintTest($mint){ H "Create account + mint 1000 BBX (test)"; spl-token create-account $mint|Out-Null; spl-token mint $mint 1000000000000|Out-Null; spl-token supply $mint }
function Multisig($mint){
  H "Multisig + authorities"
  $pk1=Read-Host "Enter PUBLIC KEY #1"; $pk2=Read-Host "Enter PUBLIC KEY #2"; $pk3=Read-Host "Enter PUBLIC KEY #3"
  $s=(& spl-token create-multisig 2 $pk1 $pk2 $pk3)|Out-String
  $ms=($s -match "Address:\s+([A-Za-z0-9]+)") ? $Matches[1] : (Read-Host "Paste MULTISIG address shown above")
  spl-token authorize $mint mint $ms|Out-Null; spl-token authorize $mint freeze --disable|Out-Null
  return $ms
}

H "Prereqs"; Ensure-Solana; Ensure-Rust; Ensure-Spl

# DEVNET
H "DEVNET"; Net "devnet"; $kDev=Key "brickbox-dev"; try{solana airdrop 2|Out-Null}catch{}
$uri=Read-Host "Paste PUBLIC URL to your bbx_metadata.json on Supabase"
$mDev=CreateMint "devnet"; MintTest $mDev; SetMeta $mDev $uri; $msDev=Multisig $mDev
"DEVNET_MINT=$mDev"|Out-File -Append $outFile; "DEVNET_MULTISIG=$msDev"|Out-File -Append $outFile; "DEVNET_KEYPAIR=$kDev"|Out-File -Append $outFile
Write-Host "Saved to $outFile" -ForegroundColor Green

# MAINNET
if((Read-Host "Repeat on MAINNET now? (y/n)") -match '^(y|Y)'){
  H "MAINNET"; Net "mainnet"; $kMain=Key "brickbox-main"; $mMain=CreateMint "mainnet"
  spl-token create-account $mMain|Out-Null; spl-token mint $mMain 1000000000000000000|Out-Null
  SetMeta $mMain $uri; $msMain=Multisig $mMain
  "MAINNET_MINT=$mMain"|Out-File -Append $outFile; "MAINNET_MULTISIG=$msMain"|Out-File -Append $outFile; "MAINNET_KEYPAIR=$kMain"|Out-File -Append $outFile
  if((Read-Host "PERMANENTLY disable minting now? type LOCK") -eq "LOCK"){ spl-token authorize $mMain mint --disable; "MAINNET_MINT_DISABLED=true"|Out-File -Append $outFile }
}
H "Done"; Write-Host "All addresses saved in $outFile" -ForegroundColor Cyan
