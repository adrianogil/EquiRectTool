class MeshBuilder
{
    constructor()
    {
        this.vertices = [];
        this.triangles = [];
        this.uvs = [];

        this.normals = [];
    }

    addVertex(v) {
        this.vertices = this.vertices.concat(v);
    }

    addTriangle(t1,t2,t3) {
        this.triangles = this.triangles.concat(t1,t2,t3);
    }

    addUV(u,v) {
        this.uvs = this.uvs.concat(u,v);
    }

    addQuad(p,v1,v2,n)
    {
        var i = this.vertices.length;

        this.addVertex(p);
        this.addVertex(p.add(v1));
        this.addVertex(p.add(v2));
        this.addVertex(p.add(v1).add(v2));

        this.addTriangle(i,i+1,i+3);
        this.addTriangle(i,i+3,i+1);
        this.addTriangle(i,i+2,i+3);
        this.addTriangle(i,i+3,i+2);

        this.addUV(0,0);
        this.addUV(0,1);
        this.addUV(1,0);
        this.addUV(1,1);

        if (n == null)
        {
            n = Vector3.crossProduct(v1,v2);
        }

        this.addNormal(n);
        this.addNormal(n);
        this.addNormal(n);
        this.addNormal(n);

    }

    addNormal(n)
    {
        this.normals = this.normals.concat(n);
    }

    addCube(p,v1,v2,v3)
    {
        this.addQuad(p,v1,v2);
        this.addQuad(p,v1,v3);
        this.addQuad(p,v2,v3);

        this.addQuad(p.add(v3),v1,v2);
        this.addQuad(p.add(v2),v1,v3);
        this.addQuad(p.add(v1),v2,v3);
    }

    createMesh(meshObject)
    {
        meshObject.vertices = this.vertices;
        meshObject.triangles = this.triangles;
        meshObject.uvs = this.uvs;
        if (this.normals.length > 0) {
            meshObject.addAttribBufferData(
                "aVertexNormal",
                Vector3.fromListToArray(this.normals),
                3
                );
        }
    }

    static createQuad(meshObject,p,v1,v2)
    {
        var meshBuilder = new MeshBuilder();
        meshBuilder.addQuad(p,v1,v2);

        return meshBuilder.createMesh(meshObject);
    }

    static createCube(meshObject,p,v1,v2,v3)
    {
        var meshBuilder = new MeshBuilder();
        meshBuilder.addCube(p,v1,v2,v3);

        return meshBuilder.createMesh(meshObject);
    }
}