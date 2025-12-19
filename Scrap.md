**Role:** You are a Senior Rust Developer specializing in Game Engines (Bevy) and Computational Geometry.

**Objective:** Create a foundational procedural 2D terrain generator in Rust using the Bevy engine (v0.15). The goal is to build a vector-based map system similar to "Azgaar’s Fantasy Map Generator" using a Voronoi dual-mesh architecture.

**Technical Stack:**

1. **Engine:** Bevy 0.17 .
    
2. **Geometry:** `spade` crate for Delaunay Triangulation and Voronoi generation.
    
3. **Noise:** `noise-rs` for heightmap generation.
    
4. **Math:** `glam` (standard in Bevy).
    

**Core Requirements & Logic:**

1. **Point Sampling:** Implement a function to generate semi-random points using Poisson Disc Sampling or jittered grid sampling within a defined width/height.
    
2. **The Dual Mesh:**
    
    - Use `spade::DelaunayTriangulation` to process the points.
        
    - Extract the **Voronoi Faces**. Each face represents a "Cell"
        
3. **Custom Mesh Generation:**
    
    - For each Voronoi Cell, generate a unique `bevy::render::mesh::Mesh`.
        
    - Since Voronoi cells are convex polygons, use **Fan Triangulation** (a center point connected to all outer vertices) to create the triangle list required for the GPU.
        
4. **Heightmap Integration:**
    
    - Generate a `f32` elevation value for each cell using Simplex noise.
        
    - Assign a color to the mesh based on height: Blue for $Height < 0.0$ (Ocean), Sandy Brown for $0.0 - 0.1$ (Beach), Green for $0.1 - 0.8$ (Land), and White for $> 0.8$ (Mountains).
        
5. **ECS Architecture:**
    
    - Define a `MapCell` Component that stores metadata (elevation, moisture, neighbors).
        
    - Spawn each cell as a separate Entity with a `Mesh2dHandle` and `Material2dHandle`.
        

**Interactivity Goal:**

- Implement a system that uses `bevy_mod_picking` or a custom raycast to detect which `MapCell` entity the mouse is hovering over.
    
- Change the material color of the hovered cell to a highlight color (e.g., Yellow) to demonstrate interactivity.
    

Deliverable:

Please provide a clean, modular Rust project structure. Break the code into:

1. `map_math.rs` (Points and Voronoi logic).
    
2. `mesh_gen.rs` (Converting Voronoi polygons to Bevy Meshes).
    
3. `main.rs` (Bevy App setup, Systems, and Camera).