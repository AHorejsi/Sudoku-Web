import { ReactNode } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { Endpoints, LocalStorageNames } from "./StringConstants";
import { updateUser, deleteUser } from "./Fetch";
import { User } from "./LoginInfo";
import { UpdateUserInfo } from "./UpdateUserInfo";
import { DeleteUserInfo } from "./DeleteUserInfo";
import { useAppDispatch, useAppSelector } from "./Hooks";
import { AppDispatch } from "./Store";
import { user, load, selectUser, selectToken } from "./UserState";
import InputField from "./InputField";

function _checkUpdate(info: UpdateUserInfo, dbUser: User, newUsername: string, newEmail: string, nav: NavigateFunction, dispatch: AppDispatch) {
    if (!info.type.endsWith("Success")) {
        nav(Endpoints.ERROR, { state: new Error("Failed to update") });
    }
    else {
        dispatch(user({
            id: dbUser.id,
            username: newUsername,
            email: newEmail,
            puzzles: dbUser.puzzles
        }));

        nav(Endpoints.GAMEPLAY);
    }
}

function _checkDelete(info: DeleteUserInfo, nav: NavigateFunction, dispatch: AppDispatch) {
    if (!info.type.endsWith("Success")) {
        nav(Endpoints.ERROR, { state: new Error("Failed to delete") });
    }
    else {
        dispatch(user(null));
        dispatch(load(null));

        nav(Endpoints.MAIN);
    }
}

function _attemptUpdate(
    dbUser: User,
    newUsername: string,
    newEmail: string,
    dispatch: AppDispatch,
    nav: NavigateFunction
) {
    if (dbUser.username === newUsername && dbUser.email === newEmail) {
        return;
    }
    
    const token = localStorage.getItem(LocalStorageNames.JWT_TOKEN);

    updateUser(dbUser.id, newUsername, newEmail, token).then((info: UpdateUserInfo) => {
        _checkUpdate(info, dbUser, newUsername, newEmail, nav, dispatch);
    }).catch((error) => {
        nav(Endpoints.ERROR, { state: error });
    });
}

function _attemptDelete(userId: number, dispatch: AppDispatch, nav: NavigateFunction) {
    const token = localStorage.getItem(LocalStorageNames.JWT_TOKEN);

    deleteUser(userId, token).then((info: DeleteUserInfo) => {
        _checkDelete(info, nav, dispatch);
    }).catch((error) => {
        nav(Endpoints.ERROR, { state: error });
    });
}

export default function UserSettingsPage(): ReactNode {
    document.title = "Sudoku - Settings";

    const nav = useNavigate();
    
    const dbUser = useAppSelector(selectUser)!;

    const dispatch = useAppDispatch();

    let newUsername = dbUser.username;
    let newEmail = dbUser.email;

    return (
        <div>
            <form onSubmit={(_) => false}>
                <InputField 
                    label="username" prompt="New Username:" covered={false}
                    inputEvent={(ev) => { newUsername = ev.currentTarget.value; }}
                />

                <InputField
                    label="email" prompt="New Email:" covered={false}
                    inputEvent={(ev) => { newEmail = ev.currentTarget.value; }}
                />
            </form>

            <span>
                <button className="btn btn-info"
                    onClick={(_) => _attemptUpdate(dbUser, newUsername, newEmail, dispatch, nav)}
                >
                    Update
                </button>

                <button className="btn btn-danger"
                    onClick={(_) => _attemptDelete(dbUser.id, dispatch, nav)}
                >
                    Delete Account
                </button>
            </span>
        </div>
    )
}
