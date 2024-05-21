import { CgSpinner } from "react-icons/cg";

export function Button({ label, className, loading, ...allProps }) {
  return (
    <button className={"button " + className} {...allProps}>
      {!loading ? (
        label
      ) : (
        <CgSpinner className="animation-360-rotate-infinite" size={27} />
      )}
    </button>
  );
}
