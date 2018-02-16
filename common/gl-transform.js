class GLTransform
{
    constructor()
    {
        this.position = new Vector3();
        this.position.z = -10.0;
        this.rotation = new Vector3();
    }

    rotate(v)
    {
        this.rotation = this.rotation.add(v);
    }
}