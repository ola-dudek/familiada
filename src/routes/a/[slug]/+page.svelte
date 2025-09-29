<script>
	import ChancesX from '../../../components/chances.svelte';
	import { page } from '$app/stores';
	import { checked, points, questions, chances } from '../../state.svelte.js';

	function toggleChecked(index) {
		checked.update((arr) => {
			arr[q][index] = !arr[q][index];
			if (!arr[q][index]) {
				points.update((p) => {
					p[q][index] = '';
					return p;
				});
			}
			return arr;
		});
	}

	const tryParseInt = (value) => {
		const parsed = parseInt(value, 10);
		if (isNaN(parsed)) {
			return null;
		} else if (parsed > 0 && parsed <= $questions.length) {
			return parsed - 1;
		} else {
			return null;
		}
	};

	const wrongAnswer = (q, team) => {
		chances.update((arr) => {
			if (arr[q][team] < 3) {
				arr[q][team] += 1;
			} else {
				arr[q][team] = 0; // Max 3 chances
			}
			return arr;
		});
	};

	// Example usage:
	$: q = tryParseInt($page.params.slug);
</script>

{#if q === null}
	<p>Invalid slug. Please provide a number between 1 and {$questions.length}.</p>
{:else}
	<h2 class="text-4xl font-bold">{$questions[q].question}</h2>

	<div class="pt-20 overflow-x-auto">
		<div class="grid w-full grid-cols-8 gap-4">
			<div class="col-span-1" role="button" on:click={() => wrongAnswer(q, 'A')}>
				<ChancesX chances={$chances[q].A} />
			</div>
			<div class="col-span-6">
				<table class="table table-xl">
					<!-- head -->
					<thead>
						<tr class="h-20">
							<th class="w-40"></th>
							<th class="w-120">Odpowiedź</th>
							<th class="w-25">Punkty</th>
							<th class="w-25"></th>
						</tr>
					</thead>
					<tbody>
						{#each $questions[q].answers as item, index}
							<tr class="h-20">
								<td
									class="flex justify-center cursor-pointer"
									on:click={() => toggleChecked(index)}
								>
									{index + 1}
								</td>
								{#if $checked[q][index]}
									<td>{item.answer}</td>
									<td class="justify-center">{item.points}</td>
									<td>
										<select bind:value={$points[q][index]} class="select">
											<option value=""></option>
											<option value="A">A</option>
											<option value="B">B</option>
										</select>
									</td>
								{:else}
									<td colspan="3" class="cursor-pointer" on:click={() => toggleChecked(index)}
										><div class="skeleton h-9 w-full"></div></td
									>
								{/if}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="col-span-1 cursor-pointer" role="button" on:click={() => wrongAnswer(q, 'B')}>
				<ChancesX chances={$chances[q].B} />
			</div>
		</div>
	</div>
{/if}
