import { cyan, teal } from "@material-ui/core/colors";

import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
	palette: {
		primary: { ...cyan, contrastText: "#fff" },
		secondary: teal
	}
});
