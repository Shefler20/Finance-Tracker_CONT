import {AppBar, Button, Container, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

const Header= () => {
    return (
        <div>
            <AppBar position="static" sx={{ backgroundColor: "grey.700" }}>
                <Container maxWidth="xl">
                    <Toolbar sx={{px:0}}>
                        <Typography variant="h4" sx={{ flexGrow: 1 }}>
                            <NavLink
                                to='/'
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >Finance Tracker </NavLink>
                        </Typography>

                            <Button
                                component={NavLink}
                                to={`/categories`}
                                sx={{
                                    color: "white",
                                    '&.active': { color: "#0e0e0e", fontWeight: "bold" },
                                }}
                            >
                                Categories
                            </Button>
                            <Button
                                sx={{
                                    color: "white",
                                    '&.active': { color: "#0e0e0e", fontWeight: "bold" },
                                }}
                            >
                                Add
                            </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};

export default Header;