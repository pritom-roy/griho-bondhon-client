import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import Loading from '../../../../shared/loading/Loading';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [revenue, setRevenue] = useState(null)

    useEffect(() => {
        document.title = "Dashboard | Admin";
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axios.get('https://griho-bandhan-server.vercel.app/admin/dashboard');
                setStats(data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        const fetchRevenue = async () => {
            try {
                const { data } = await axios.get('https://griho-bandhan-server.vercel.app/revenue');
                setRevenue(data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        }

        fetchStats();
        fetchRevenue();
    }, []);

    if (!stats || !revenue) return <Loading />;


    const chartData = {
        labels: ['Total Biodata', 'Male Biodata', 'Female Biodata', 'Premium Biodata'],
        datasets: [
            {
                label: 'Biodata Statistics',
                data: [
                    stats.totalBiodata,
                    stats.maleBiodata,
                    stats.femaleBiodata,
                    stats.premiumBiodata
                ],
                backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f'],
                hoverBackgroundColor: ['#2980b9', '#27ae60', '#c0392b', '#f39c12']
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top'
            }
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Revenue</h2>
                <p className="text-lg">
                    Total Revenue: <span className="font-bold text-green-500">${revenue[0].totalRevenue}</span>
                </p>
            </div>

            <div className="bg-white rounded-lg mb-10 md:py-6 h-60 md:h-[400px]" >
                <h2 className="text-xl font-semibold mb-4">Biodata Statistics</h2>
                <Pie data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default AdminDashboard;
