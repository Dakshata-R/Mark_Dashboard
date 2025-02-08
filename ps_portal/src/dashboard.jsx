import React, { useState } from "react";
import { Container, Button, Typography, Box, Grid, Card, CardMedia, CardContent } from "@mui/material";

const courses = [
  { name: "C PROGRAMMING", image: "https://tinyurl.com/3r29sdk9" },
  { name: "PYTHON PROGRAMMING", image: "https://i.ytimg.com/vi/YAfbi1fx7ek/sddefault.jpg" },
  { name: "JAVA PROGRAMMING", image: "https://tinyurl.com/2zzrrjac" },
];

const Dashboard = () => {
  const [showCourses, setShowCourses] = useState(false);

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* Sidebar */}
        <Box sx={{ width: "250px", bgcolor: "#eee", p: 3 }}>
          <Typography variant="h6">Dashboard</Typography>
          <Button 
            fullWidth 
            variant="contained" 
            sx={{ mt: 2 }} 
            onClick={() => setShowCourses(true)}
          >
            📚 Courses Available
          </Button>
        </Box>

        {/* Main Content - Changes when "Courses Available" is clicked */}
        <Box sx={{ flexGrow: 1, p: 5 }}>
          {showCourses ? (
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
          ) : (
            <Typography variant="h4">Welcome to the Dashboard 🎉</Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;