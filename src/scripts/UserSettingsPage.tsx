import React, { ReactNode, useState } from "react";
import { update } from "./Fetch";
import { NavigateFunction, useLocation, useNavigate } from "react-router";
import { UpdateInfo } from "./UpdateInfo";

// TODO: Location state not being updated

function _attemptUpdate(state: any, newUsername: string, newEmail: string, nav: NavigateFunction) {
    if (state.oldUsername !== newUsername || state.oldEmail !== newEmail) {
        const updateResult = update(state.userId, state.oldUsername, state.oldEmail, newUsername, newEmail);

        updateResult.then((info: UpdateInfo) => {
            if (!info.type.endsWith("Success")) {
                throw new Error("Failed to update");
            }
        }).catch((error: Error) => {
            throw error
        }).finally(() => {
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
        });
    }
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
                        onClick={(ev) => _attemptUpdate(loc.state, newUsername, newEmail, nav)}
                    />
                </div>
            </form>

            <div>

            </div>
        </div>
    )
}
