import Node from "../Node";

const SemesterColumn = ({ entries }) => (
  <div
    className="flex flex-col items-center w-32 justify-center"
    style={{ minHeight: 300 }}
  >
    <div className="flex flex-col items-center gap-16 justify-center flex-1">
      {entries.map((entry) => (
        <Node key={entry.id} data={entry} />
      ))}
    </div>
  </div>
);

export default SemesterColumn;
