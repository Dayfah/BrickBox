import { CollectionForm } from '../../components/CollectionForm';
import { CollectionList } from '../../components/CollectionList';

export default function CollectionPage() {
  return (
    <div className="grid two">
      <CollectionForm />
      <CollectionList />
    </div>
  );
}
