import SemesterColumn from "./Columns";
import {
  splitEntriesBySemester,
  splitEntriesByTrimester,
} from "../../utils/utilsFunctions";

const YearSection = ({ year, entries }) => {
  let columns = [];

  if (entries.length < 3) {
    columns = [{ entries }];
  } else if (entries.length < 7) {
    const { firstHalf, secondHalf } = splitEntriesBySemester(entries);
    if (firstHalf.length) columns.push({ entries: firstHalf });
    if (secondHalf.length) columns.push({ entries: secondHalf });
  } else {
    const { first, second, third } = splitEntriesByTrimester(entries);
    if (first.length) columns.push({ entries: first });
    if (second.length) columns.push({ entries: second });
    if (third.length) columns.push({ entries: third });
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex mb-12" style={{ width: `${columns.length * 8}rem` }}>
        <div className="flex-1"></div>
        <div className="w-32 text-white font-bold text-center text-6xl anton-regular">
          {year}
        </div>
        <div className="flex-1"></div>
      </div>
      <div className={`flex ${columns.length > 1 ? "gap-64" : ""}`}>
        {columns.map((col, idx) => (
          <SemesterColumn key={`${year}-col-${idx}`} entries={col.entries} />
        ))}
      </div>
    </div>
  );
};

export default YearSection;
