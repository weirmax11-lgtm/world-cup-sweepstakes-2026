const POINTS = {
  GROUP_WIN: 3,
  DRAW: 1,
  KO_WIN: 6,
  CHAMPION: 10,
  GOAL: 0.5
};

function calculatePoints(player, teams, matches) {
  let total = 0;

  player.teams.forEach(teamName => {
    const team = teams.find(t => t.name === teamName);

    // Goals
    total += team.goalsFor * POINTS.GOAL;

    // Group results
    total += team.wins * POINTS.GROUP_WIN;
    total += team.draws * POINTS.DRAW;

    // Knockout
    total += team.knockoutWins * POINTS.KO_WIN;

    // Champion
    if (team.isChampion) {
      total += POINTS.CHAMPION;
    }
  });

  return total;
}

async function loadData() {
  const players = await fetch('data/players.json').then(r => r.json());
  const teams = await fetch('data/teams.json').then(r => r.json());

  players.forEach(player => {
    player.points = calculatePoints(player, teams);
  });

  players.sort((a, b) => b.points - a.points);

  const board = document.getElementById('leaderboard');

  board.innerHTML = players.map(p => `
    <div class="player">
      <h2>${p.name}</h2>
      <p>Points: ${p.points}</p>
      <small>${p.teams.join(', ')}</small>
    </div>
  `).join('');
}

loadData();
