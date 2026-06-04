import { useEffect, useState } from "react";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import useMembers from "../../hooks/useMembers";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function StatsDashboardPage() {
    const { stats, loadStats } = useMembers();

    useEffect(() => {
        loadStats();
    }, []);

    const chartData = stats.countByType
        ? Object.entries(stats.countByType).map(([name, value]) => ({ name, value }))
        : [];

    return (
        <section>
            <h2>Statisztika Dashboard</h2>
            <Grid container spacing={2} style={{ marginBottom: "2rem" }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary">Összes tag</Typography>
                            <Typography variant="h4">{stats.totalMembers ?? "-"}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary">Aktív tagok</Typography>
                            <Typography variant="h4">{stats.activeMembers ?? "-"}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary">Havi bevétel</Typography>
                            <Typography variant="h4">{stats.totalMonthlyRevenue ?? "-"} Ft</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary">Átlagos díj</Typography>
                            <Typography variant="h4">{stats.averageFee ? stats.averageFee.toFixed(0) : "-"} Ft</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={4}>

                
                <Grid item xs={12} md={6}>
                    <h3>Tagok csomag szerint (Pie)</h3>
                    <PieChart width={400} height={300}>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label={({ name, value }) => `${name}: ${value}`}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </Grid>

                <Grid item xs={12} md={6}>
                    <h3>Tagok csomag szerint (Bar)</h3>
                    <BarChart width={400} height={300} data={chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="Tagok száma" fill="#0088FE" />
                    </BarChart>
                </Grid>

            </Grid>
        </section>
    );
}

export default StatsDashboardPage;