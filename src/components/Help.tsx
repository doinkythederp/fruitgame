import { useState } from "preact/hooks";
import "./help.css";

export default function Help() {
    const [helpOpen, setHelpOpen] = useState(false);
    return (
        <>
            <div class="sidebar" data-open={helpOpen}>
                <h2>Instructions</h2>
                <div>
                    <h3>Goal</h3>
                    <p>
                        Pop fruit in groups of 3 or more to score points. Groups
                        can be connected horizontally, vertically, or
                        diagonally.
                    </p>
                </div>
                <div>
                    <h3>Points</h3>
                    <p>Some fruit are worth more points than others.</p>
                </div>
            </div>
            <button
                class="toggle-help"
                type="button"
                onClick={() => setHelpOpen((open) => !open)}
                title="Help"
            >
                {helpOpen ? "X" : "?"}
            </button>
        </>
    );
}
