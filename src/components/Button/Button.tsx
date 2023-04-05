import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

interface ButtonType {
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: (e:any) => void;
}

function Button({ onClick, disabled, loading, children, className }: ButtonType) {
  return (
    <button
      className={`bg-white active:bg-gray-200 rounded-md border p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 ${className}`}
      disabled={ disabled }
      {...( (!disabled && onClick && !loading) && { onClick })}
    >
      { loading ? <FontAwesomeIcon icon={faSpinner} /> : children }
    </button>
  )
}

export default Button;