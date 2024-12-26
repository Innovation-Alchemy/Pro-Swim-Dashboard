import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Markdown from "markdown-to-jsx";

const ProductInfoSection = ({
  title,
  description,
  onRemove,
  onEdit,
}: {
  title: string;
  description: string;
  onRemove: () => void;
  onEdit: () => void;
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between font-bold text-lg">
        {title}
        <div className="space-x-2 flex">
          <div onClick={onEdit}>
            <FontAwesomeIcon icon={faEdit} />
          </div>
          <div onClick={onRemove}>
            <FontAwesomeIcon icon={faTrash} className="text-red-600" />
          </div>
        </div>
      </div>
      <Markdown>{description}</Markdown>
    </div>
  );
};

export default ProductInfoSection;
