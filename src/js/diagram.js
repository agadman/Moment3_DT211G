import Chart from 'chart.js/auto';

document.addEventListener("DOMContentLoaded", async function () {
    /**
     * Referens till canvas-elementet för stapeldiagrammet
     * @type {HTMLCanvasElement}
     */
    const barChartElement = document.getElementById('myBarChart');

    /**
     * Referens till canvas-elementet för cirkeldiagrammet
     * @type {HTMLCanvasElement}
     */
    const pieChartElement = document.getElementById('myPieChart');

    /**
     * Här hämtas och bearbetas datan från API.
     * @async
     * @function fetchData
     * @returns {Promise<{ courses: Array<Object>, programs: Array<Object> }>} Promise med filtrerad kurs- och programdata
     */
    async function fetchData() {
        try {
            const response = await fetch('https://studenter.miun.se/~mallar/dt211g/');
            const data = await response.json();

            return {
                /**
                 * Filtrerar ut kurser, sorterar i fallande (mest sökta först) och tar de 6 mest sökta
                 * @type {Array<Object>}
                 */
                courses: data
                    .filter(item => item.type === "Kurs")
                    .sort((a, b) => b.applicantsTotal - a.applicantsTotal)
                    .slice(0, 6),

                /**
                 * Filtrerar ut program, sorterar i fallande och tar de 5 mest sökta
                 * @type {Array<Object>}
                 */
                programs: data
                    .filter(item => item.type === "Program")
                    .sort((a, b) => b.applicantsTotal - a.applicantsTotal)
                    .slice(0, 5)
            };
        } catch (error) {
            console.error("Fel vid hämtning av data:", error);
            return { courses: [], programs: [] };
        }
    }

    /**
     * Skapar ett stapeldiagram.
     * @function createBarChart
     * @param {HTMLCanvasElement} element - Canvas-elementet för diagrammet
     * @param {Array<Object>} courses - Array med kursdata
     */
    function createBarChart(element, courses) {
        /**
            * Färger för staplarna i stapeldiagrammet
            * @type {array<string>}
        */
        const barColors = ["#FF5500", "#E64A19", "#BF360C", "#8D6E63", "#A0A0A0", "#CCCCCC"];

        new Chart(element, {
            type: 'bar',
            data: {
                labels: courses.map(course => course.name),
                datasets: [{
                    label: 'Totalt antal sökande',
                    data: courses.map(course => course.applicantsTotal),
                    borderWidth: 1,
                    backgroundColor: barColors
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
    }

    /**
     * Skapar ett cirkeldiagram
     * @function createPieChart
     * @param {HTMLCanvasElement} element - Canvas-elementet för diagrammet
     * @param {Array<Object>} programs - Array med programdata
     */
    function createPieChart(element, programs) {
        /**
            * Färger för cirkeldiagrammet
            * @type {array<string>}
        */
        const pieColors = ["#FF5500", "#FFA726", "#66BB6A", "#42A5F5", "#AB47BC"];

        new Chart(element, {
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
    }

    const data = await fetchData();

    if (barChartElement && pieChartElement) {
        createBarChart(barChartElement, data.courses);
        createPieChart(pieChartElement, data.programs);
    }
});