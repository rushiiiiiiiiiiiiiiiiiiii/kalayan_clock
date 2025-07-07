import { Link } from "react-router-dom";
import { FaUpload, FaCalendarAlt, FaPlayCircle } from "react-icons/fa";

export default function MediaSettingsCard() {
  return (
    <div className=" dark:bg-gray-700 p-6 rounded-lg ">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Media Settings
      </h3>

      <ul className="space-y-3">
        {/* <li>
          <Link
            to="/upload"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <FaUpload />
            Media Upload
          </Link>
        </li> */}
        <li>
          <Link
            to="/ "
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <FaCalendarAlt />
            Schedule Media
          </Link>
        </li>
        <li>
          <Link
            to="/play"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <FaPlayCircle />
            Playback Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}
