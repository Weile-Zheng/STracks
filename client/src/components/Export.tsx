import { useState } from "react";
import { Button, Collapse } from "react-bootstrap";

function Export() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<p className="d-inline-flex gap-1">
				<Button
					onClick={() => setOpen(!open)}
					aria-controls="collapseExample"
					aria-expanded={open}
				>
					Start Export
				</Button>
			</p>
			<Collapse in={open}>
				<div id="collapseExample">
					Some placeholder content for the collapse component. This panel is
					hidden by default but revealed when the user activates the relevant
					trigger.
				</div>
			</Collapse>
		</>
	);
}

export default Export;
