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


Heightmap stack:
1. plate techtonics for mountains, cliffs, tecnches, etc.
2. fractal noise with gradient erosion for detail
3. falloff map to ensure map is surrounded by water

Plate interactions
1. ^ + ^ = mountain
2. ^ + ˇ = volcanic mountain range or islands or cliff
3. ˇ + ˇ = Trench