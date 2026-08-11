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
- Plate tectonics interactions for height map generation

Todo:
Create a graph for cells

Heightmap Algo:
1. Choose seed points
2. Give seed points
	1. random Vector3 for plate movement
3. Add neighbours to queue - BFS
4. Assign Cell height
5. Mark visited
6. Use prng to generate height for next cell
7. Go to step 4
8. Assign plate origin
9. stop when height is >= height threshold
10. Recalculate height for each border plate based on plate vectors
11. Depending on height increase, update heights for edge cell neighbours that belong to the same plate
12. Apply falloff map so that the edges are water

Plate interactions
1. ^ + ^ = mountain
2. ^ + ˇ = volcanic mountain range or islands or cliff
3. ˇ + ˇ = Trench