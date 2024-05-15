### Features
- Terrain generation 
- Automatic Climate / biomes
- Non-destructive editing 
- heightmap editor

Todo:
Rewrite Voronoi

## Research:
- falloff maps
- fractal perlin/simplex noise + gradient smoothing
- plate tectonics interactions for height map generation

Todo:
create a graph for cells

Heightmap Algo:
1. Choose seed points
2. give seed points
	1. random vector3 for plate movement
3. Add neighbours to queue - BFS
5. Assign Cell height
6. Mark visited
7. Use prng to generate height for next cell
8. goto step 4
9. assign plate origin
10. stop when height is >= height threshold
11. recalculate height for each border plate based on plate vectors
12. depending on height increase, update heights for edge cell neighbours that belong to the same plate
13. Apply falloff map so that the edges are water

Plate interactions
1. ^ + ^ = mountain
2. ^ + ˇ = volcanic mountain range or islands or cliff
3. ˇ + ˇ = Trench