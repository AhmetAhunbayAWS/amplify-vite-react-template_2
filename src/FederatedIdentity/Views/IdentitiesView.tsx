import { IdentitiesControl } from "./Controls/IdentitiesControl"
import { ListControl } from "./Controls/ListControl"

export default function IdentityView(): JSX.Element {
    return (
        <ListControl>
            <IdentitiesControl/>
        </ListControl>
    )
}