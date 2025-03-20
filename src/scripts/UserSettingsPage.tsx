import React, { ReactNode, useState } from "react";
import { updateUser, deleteUser } from "./Fetch";
import { NavigateFunction, useLocation, useNavigate } from "react-router";
import { UpdateInfo } from "./UpdateInfo";
import { DeleteInfo } from "./DeleteInfo";

function _checkUpdate(info: UpdateInfo, state: any, newUsername: string, newEmail: string, nav: NavigateFunction) {
    if (!info.type.endsWith("Success")) {
        throw new Error("Failed to update");
    }

    const options = {
        state: {
            id: state.userId,
            username: newUsername,
            email: newEmail,
            puzzles: state.puzzles
        },
        replace: false
    };

    nav("/gameplay", options);
}

function _checkDelete(info: DeleteInfo, nav: NavigateFunction) {
    if (!info.type.endsWith("Success")) {
        throw new Error("Failed to delete");
    }

    const options = { replace: false };

    nav("/signup", options);
}

function _attemptUpdate(state: any, newUsername: string, newEmail: string, nav: NavigateFunction) {
    if (state.oldUsername === newUsername && state.oldEmail === newEmail) {
        return;
    }

    const updateResult = updateUser(state.userId, state.oldUsername, state.oldEmail, newUsername, newEmail);

    updateResult.then((info: UpdateInfo) => {
        _checkUpdate(info, state, newUsername, newEmail, nav);
    }).catch((error: Error) => {
        throw error;
    });
}

function _attemptDelete(userId: number, nav: NavigateFunction) {
    const deleteResult = deleteUser(userId);

    deleteResult.then((info: DeleteInfo) => {
        _checkDelete(info, nav);
    }).catch((error: Error) => {
        throw error;
    });
}

export default function UserSettingsPage(): ReactNode {
    const loc = useLocation();
    const nav = useNavigate();

    const [newUsername, setUsername] = useState(loc.state.oldUsername);
    const [newEmail, setEmail] = useState(loc.state.oldEmail);

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
                        onClick={(_) => _attemptUpdate(loc.state, newUsername, newEmail, nav)}
                    />
                </div>
            </form>

            <div>
                <label htmlFor="delete" />
                <button name="delete" onClick={(_) => _attemptDelete(loc.state.userId, nav)}>Delete Account</button>
            </div>
        </div>
    )
}
