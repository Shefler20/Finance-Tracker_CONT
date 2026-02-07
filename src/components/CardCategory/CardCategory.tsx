import React from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";

interface Props {
    category: ICategory;
    onEdit: (category: ICategory) => void;
    onDelete: (id: string) => void;
}

const CardCategory: React.FC<Props> = ({ category, onEdit, onDelete }) => {
    const typeColor = category.type === "income" ? "green" : "red";
    return (
        <Card sx={{ minWidth: 250, mb: 2 }}>
            <CardContent>
                <Typography variant="h6" component="div">
                    {category.categoryName}
                </Typography>
                <Typography color={typeColor}>
                    Type: {category.type}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onEdit(category)}
                >
                    Edit
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => onDelete(category.id)}
                >
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default CardCategory;