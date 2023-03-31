const Spinner = ({className, pathColor}) => (
  <div className="flex justify-center items-center py-auto">
    <div className={`${className ?? "h-6 w-6 border-b-2"} animate-spin rounded-full ${pathColor ?? "border-gray-700"}`} ></div>
  </div>
);

export default Spinner;
