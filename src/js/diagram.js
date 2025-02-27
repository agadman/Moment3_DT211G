import Chart from 'chart.js/auto';

document.addEventListener("DOMContentLoaded", async function () {
    /**
     * Referens till canvas-elementet för stapeldiagrammet
     * @type {HTMLCanvasElement}
     */
    const barChart = document.getElementById('myBarChart');
    /**
     * Referens till canvas-elementet för cirkeldiagrammet
     * @type {HTMLCanvasElement}
     */
    const pieChart = document.getElementById('myPieChart');

    async function fetchData() {
        try {
            const response = await fetch('https://studenter.miun.se/~mallar/dt211g/');
            const data = await response.json();

            /**
             * Filtrerar ut kurser, sorterar i fallande (mest sökta först) och tar med de 6 mest söka
             * @type {array<Object>}
             */
            const courses = data
                .filter(item => item.type === "Kurs")  
                .sort((a, b) => b.applicantsTotal - a.applicantsTotal) 
                .slice(0, 6); 

            /**
             * Filtrerar ut program, sorterar i fallande (mest sökta först) och tar med de 5 mest söka
             * @type {array<Object>}
            */
            const programs = data
                .filter(item => item.type === "Program") 
                .sort((a, b) => b.applicantsTotal - a.applicantsTotal) 
                .slice(0, 5); 
            
            /**
             * Färger för staplarna i stapeldiagrammet
             * @type {array<string>}
            */
            const barColors = ["#FF5500", "#E64A19", "#BF360C", "#8D6E63", "#A0A0A0", "#CCCCCC"]; 
            /**
             * Färger för cirkeldiagrammet
             * @type {array<string>}
            */
            const pieColors = ["#FF5500", "#FFA726", "#66BB6A", "#42A5F5", "#AB47BC"]; 

            new Chart(barChart, {
                type: 'bar',
                data: {
                    labels: courses.map(course => course.name),
                    datasets: [{
                        label: 'Totalt antal sökande',
                        data: courses.map(course => course.applicantsTotal), 
                        borderWidth: 1,
                        backgroundColor: barColors, 
                    }]
                },
                options: {
                    responsive: true,
                    aspectRatio: 2, 
                    scales: {
                        x: {
                            ticks: {
                                autoSkip: false,
                                maxRotation: 40,
                                minRotation: 40,
                                callback: function(value) {
                                    let label = this.getLabelForValue(value);
                                    return label.match(/.{1,36}/g) || label; 
                                }
                            }
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            new Chart(pieChart, {
                type: 'pie',
                data: {
                    labels: programs.map(program => program.name),
                    datasets: [{
                        label: 'Totalt antal sökande',
                        data: programs.map(program => program.applicantsTotal), 
                        backgroundColor: pieColors, 
                        borderWidth: 1
                    }]
                }
            });

        } catch (error) {
            console.error("Fel vid hämtning av data:", error);
        }
    }
    await fetchData();
});