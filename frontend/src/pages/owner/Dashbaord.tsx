import { TotaldataComponent } from "../../components/owner/TotaldataComponent";
import { CreateEmployeComponent } from "../../components/owner/CreateemployeComponent"
import { CreateTeamComponent } from "../../components/owner/CreateteamCompnent"
export const Dashbaord = () => {
    return (
        <div>
            <TotaldataComponent />
            <CreateEmployeComponent />
            <CreateTeamComponent />
        </div>
    )
}
