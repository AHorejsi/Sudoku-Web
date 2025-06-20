import { ReactNode, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { Endpoints } from "./StringConstants";
import { updateUser, deleteUser } from "./Fetch";
import { User } from "./LoginInfo";
import { UpdateUserInfo } from "./UpdateUserInfo";
import { DeleteUserInfo } from "./DeleteUserInfo";
import { useAppDispatch, useAppSelector } from "./Hooks";
import { AppDispatch, RootState } from "./Store";
import { user } from "./UserState";
import { load } from "./LoadState";

function _checkUpdate(info: UpdateUserInfo, nav: NavigateFunction) {
    if (!info.type.endsWith("Success")) {
        throw new Error("Failed to update");
    }

    nav(Endpoints.GAMEPLAY);
}

function _checkDelete(info: DeleteUserInfo, nav: NavigateFunction) {
    if (!info.type.endsWith("Success")) {
        throw new Error("Failed to delete");
    }

    nav(Endpoints.MAIN);
}

function _attemptUpdate(dbUser: User, newUsername: string, newEmail: string, dispatch: AppDispatch, nav: NavigateFunction) {
    if (dbUser.username === newUsername && dbUser.email === newEmail) {
        return;
    }

    updateUser(dbUser.id, newUsername, newEmail).then((info: UpdateUserInfo) => {
        dispatch(user({
            id: dbUser.id,
            username: newUsername,
            email: newEmail,
            puzzles: dbUser.puzzles
        }));
        
        _checkUpdate(info, nav);
    }).catch((error: Error) => {
        throw error;
    });
}

function _attemptDelete(userId: number, dispatch: AppDispatch, nav: NavigateFunction) {
    deleteUser(userId).then((info: DeleteUserInfo) => {
        dispatch(user(null));
        dispatch(load(null));

        _checkDelete(info, nav);
    }).catch((error: Error) => {
        throw error;
    });
}

export default function UserSettingsPage(): ReactNode {
    const nav = useNavigate();
    const user = useAppSelector((state: RootState) => state.login.user)!;
    const dispatch = useAppDispatch();

    const [newUsername, setUsername] = useState(user.username);
    const [newEmail, setEmail] = useState(user.email);

    return (
        <div id="settings">
            <form>
                <div>
                    Username: 

                    <label htmlFor="username" />
                    <input type="text" name="username" value={newUsername} onInput={(ev) => setUsername(ev.currentTarget.value)} />
                </div>

                <div>
                    Email: 

                    <label htmlFor="email" />
                    <input type="text" name="email" value={newEmail} onInput={(ev) => setEmail(ev.currentTarget.value)} />
                </div>

                <div>
                    <label htmlFor="update" />
                    <input type="button" name="update" value="Update Info"
                        onClick={(_) => _attemptUpdate(user, newUsername, newEmail, dispatch, nav)}
                    />
                </div>
            </form>

            <div>
                <label htmlFor="delete" />
                <button name="delete" onClick={(_) => _attemptDelete(user.id, dispatch, nav)}>Delete Account</button>
            </div>
        </div>
    )
}
