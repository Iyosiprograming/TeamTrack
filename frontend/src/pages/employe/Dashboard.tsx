import Profilecomponent from '../../components/employe/Profilecomponent'
import { UpdateProfile } from '../../components/employe/Updateprofile'
import { AttendanceComponent } from "../../components/employe/Attendacecomponet"
export const Dashboard = () => {
    return (
        <div>

            <Profilecomponent />
            <UpdateProfile />
            <AttendanceComponent />
        </div>
    )
}
