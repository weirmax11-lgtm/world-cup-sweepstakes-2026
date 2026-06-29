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
