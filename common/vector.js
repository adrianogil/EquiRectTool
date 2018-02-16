class Vector3
{
    constructor(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }

    add(v)
    {
        if (v instanceof Vector3)
            return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
        else
            return new Vector3(this.x + v, this.y + v, this.z + v);
    }

    multiply(v)
    {
        if (v instanceof Vector3)
            return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
        else
            return new Vector3(this.x * v, this.y * v, this.z * v);
    }

    static Forward()
    {
        return new Vector3(0.0, 0.0, 1.0);
    }

    static Backward()
    {
        return new Vector3(0.0, 0.0, -1.0);
    }

    static Up()
    {
        return new Vector3(0.0, 1.0, 0.0);
    }


    static Down()
    {
        return new Vector3(0.0, -1.0, 0.0);
    }

    static Right()
    {
        return new Vector3(1.0, 0.0, 0.0);
    }

    static Left()
    {
        return new Vector3(-1.0, 0.0, 0.0);
    }

    static crossProduct(v1,v2)
    {
        var x = v1.y*v2.z - v1.z*v2.y;
        var y = v1.z*v2.x - v1.x*v2.z;
        var z = v1.x*v2.y - v1.y*v2.x;

        return new Vector3(x,y,z);
    }

    static fromListToArray(vectorList)
    {
        var arrayData = []

        const total = vectorList.length;

        for (var i = 0; i < total; i++)
        {
            arrayData = arrayData.concat(
                    vectorList[i].x,
                    vectorList[i].y,
                    vectorList[i].z
                );
        }

        return arrayData;
    }

}