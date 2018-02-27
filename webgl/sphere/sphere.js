var Sphere = new function()
{
    this.meshBuilder = null;
    this.create = function(meshObject, radius)
    {
        this.meshBuilder = new MeshBuilder();

        nbLat = 24;
        nbLong = 16;

        this.meshBuilder.addVertex(Vector3.Up().multiply(radius));
        this.meshBuilder.addUV(1,0);

        for (var lat = 0; lat < nbLat; lat++)
        {
            var a1 = Math.PI * (lat+1.0) / (nbLat+1);
            var sin1 = Math.sin(a1);
            var cos1 = Math.cos(a1);

            for (var lon = 0; lon <= nbLong; lon++)
            {
                var a2 = 2.0 * Math.PI * (lon == nbLong? 0 : lon) / nbLong;
                var sin2 = Math.sin(a2);
                var cos2 = Math.cos(a2);

                this.meshBuilder.addVertex(new Vector3(sin1 * cos2, cos1, sin1 * sin2).multiply(radius));
                this.meshBuilder.addUV(lon / nbLong, 1.0 - (lat+1.0) / (nbLat+1.0) );
            }
        }

        this.meshBuilder.addVertex(Vector3.Down().multiply(radius));
        this.meshBuilder.addUV(0,0);

        // Triangles
        var nbFaces = this.meshBuilder.vertices.length;

        //Top Cap
        for( var lon = 0; lon < nbLong; lon++ )
        {
            this.meshBuilder.addTriangle(lon+2, 0, lon+1);
        }

        //Middle
        for( var lat = 0; lat < nbLat - 1; lat++ )
        {
            for( var lon = 0; lon < nbLong; lon++ )
            {
                var current = lon + lat * (nbLong + 1) + 1;
                var next = current + nbLong + 1;

                this.meshBuilder.addTriangle(current, next+1, current+1);
                this.meshBuilder.addTriangle(current, next, next+1);
            }
        }

        //Bottom Cap
        for( var lon = 0; lon < nbLong; lon++ )
        {
            this.meshBuilder.addTriangle(nbFaces - 1, nbFaces - (lon+1) - 1, nbFaces - (lon+2) - 1);
        }

        this.meshBuilder.createMesh(meshObject);
    };

}