import { derived, writable, readable, get } from "svelte/store";

export const questions = readable(
  [ // 1
    {
      question: '',
      answers: [
        { answer: 'Dania', points: 29 },
        { answer: 'Hiszpania', points: 25 },
        { answer: 'Japonia', points: 19 },
        { answer: 'Estonia', points: 15 },
        { answer: 'Rumunia', points: 12 },],
    },
    { // 2  
      question: '',
      answers: [
        { answer: 'Hitler', points: 32 },
        { answer: 'Stalin', points: 27 },
        { answer: 'Lenin', points: 20 },
        { answer: 'Caryca Katarzyna', points: 15 },
        { answer: 'Dzierżyński', points: 6 },
      ],
    },
    { // 3
      question: '',
      answers: [
        { answer: 'Lewandowski', points: 28 },
        { answer: 'Kubica', points: 24 },
        { answer: 'Korzeniowski', points: 20 },
        { answer: 'Gawliński', points: 16 },
        { answer: 'Makłowicz', points: 12 },
      ]
    },
    { // 4
      question: '',
      answers: [
        { answer: 'Kot', points: 31 },
        { answer: 'Mysz', points: 25 },
        { answer: 'Tygrys', points: 22 },
        { answer: 'Foka', points: 14 },
        { answer: 'Lew', points: 8 },
      ]
    },
    { // 5
      question: '',
      answers: [
        { answer: 'Gazu', points: 27 },
        { answer: 'Przyprawy', points: 24 },
        { answer: 'Odwagi', points: 20 },
        { answer: 'Skrzydeł', points: 15 },
        { answer: 'Otuchy', points: 8 },
        { answer: 'Lat', points: 6 },
      ]
    }
  ]);

export const checked = writable(get(questions).map(qs => qs.answers.map(() => false)));
export const points = writable(get(questions).map(qs => qs.answers.map(() => '')));
export const chances = writable(get(questions).map((qs) => ({ A: 0, B: 0 })));

export const scoreA = derived(points, ($points) => {
  let score = 0;
  $points.forEach((_, qIndex) => {
    $points[qIndex].forEach((n, i) => {
      if (n === 'A') {
        score += get(questions)[qIndex].answers[i].points;
      }
    });
  });
  return score;
});

export const scoreB = derived(points, ($points) => {
  let score = 0;
  $points.forEach((_, qIndex) => {
    $points[qIndex].forEach((n, i) => {
      if (n === 'B') {
        score += get(questions)[qIndex].answers[i].points;
      }
    });
  });
  return score;
});