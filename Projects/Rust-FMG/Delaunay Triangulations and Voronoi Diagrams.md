Creating Delaunay Triangulations and Voronoi diagrams are complex computational geometry tasks that typically involve sophisticated algorithms. However, I can provide a high-level pseudocode representation of these processes to give you an idea of how they work. Note that implementing these algorithms in practice can be quite challenging and may require specialized libraries or tools. Below is pseudocode for both Delaunay Triangulation and Voronoi Diagrams:

### Delaunay Triangulation Pseudocode
```
function DelaunayTriangulation(points) 
	Initialize an empty list called triangles 
	Add a super-triangle that encloses all the points to the triangles list 
	
	for each point in points: 
	Initialize an empty list called badTriangles 
		for each triangle in triangles: 
			if point is inside the circumcircle of triangle: 
				Add triangle to badTriangles 
				
		Initialize an empty list called polygon 
		for each triangle in badTriangles: 
			for each edge in triangle: 
				if edge is not shared by any other triangle in badTriangles: 
					Add edge to polygon 
		for each triangle in badTriangles: 
			Remove triangle from triangles 
		for each edge in polygon: 
		Add a new triangle formed by connecting point and the edge's vertices to triangles 
		
	Remove all triangles that share vertices with the super-triangle from triangles 
		
	return triangles
```
### Voronoi Diagram Pseudocode
```
function VoronoiDiagram(points, bounding_box)
	Initialize an empty list called cells     
	for each point in points:         
		Initialize an empty list called edges         
		for each other point in points:             
			if point is not equal to other point:                 
				Calculate the perpendicular bisector of the line between point and other point                 
				Intersect this bisector with the bounding_box to get a finite line segment                 
				Add the segment to the edges list          
		Create a cell for the point, which consists of the region enclosed by the edges in the edges list         
		Add the cell to the cells list      return cells
```

These pseudocodes provide an overview of the steps involved in creating Delaunay Triangulations and Voronoi Diagrams. Implementing them in actual code can be significantly more involved, and you may need to use specialized libraries or algorithms for efficient computation. Additionally, there are various ways to optimize and improve these algorithms, so the pseudocodes provided are simplified representations.