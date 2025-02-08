import React from "react";
import { Container, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

const courses = [
  { name: "React Development", image: "https://source.unsplash.com/400x300/?react,code" },
  { name: "Node.js Backend", image: "https://source.unsplash.com/400x300/?nodejs,server" },
  { name: "MySQL Database", image: "https://source.unsplash.com/400x300/?database,sql" },
];

const Courses = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" textAlign="center" mb={4}>
        📚 Available Courses
      </Typography>

      <Grid container spacing={3}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ boxShadow: 5, borderRadius: 3 }}>
              <CardMedia component="img" height="200" image={course.image} alt={course.name} />
              <CardContent>
                <Typography variant="h6">{course.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Courses;

