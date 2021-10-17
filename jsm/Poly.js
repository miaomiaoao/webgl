const defaultAttr = () => ({
  gl: null,
  vertices: [],
  geoData: [],
  size: 2, // 顶点分量的数目
  attrName: 'a_Position',
  count: 0,
  types: ['POINTS']
})

export default class Poly {
  constructor(attr) {
    Object.assign(this, defaultAttr(), attr)
    this.init()
  }
  init() {
    const { attrName, gl, size } = this
    if (!gl) return
    const vertextBuffer = gl.createBuffer()
    // 绑定buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, vertextBuffer)
    // 绑定data
    this.updateBuffer()
    // 获取attrName的location
    const a_Position = gl.getAttribLocation(gl.program, attrName)
    // 修改attribute的值
    gl.vertexAttribPointer(a_Position, size, gl.FLOAT, false, 0, 0)
    // 赋能-批处理
    gl.enableVertexAttribArray(a_Position)
  }
  addVertice(...params) {
    this.vertices.push(...params)
    this.updateBuffer()
  }
  popVertice() {
    const { size, vertices } = this
    const length = vertices.length
    vertices.splice(length-size, length)
    this.updateCount()
  }
  /**
   * 根据索引位置设置顶点
   * @param index 
   * @param params 
   */
  setVertice(index, ...params) {
    const { vertices, size } = this
    const i = index * size
    params.forEach((param, paramIndex) => {
      vertices[i+paramIndex] = param
    })
  }
  updateVertices(params) {
    const {geoData} = this
    const vertices = []
    geoData.forEach(data => {
      params.forEach(key => {
        vertices.push(data[key])
      })
    })
    this.vertices = vertices
  }
  updateBuffer() {
    const { gl, vertices } = this
    this.updateCount()
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
  }
  updateCount() {
    this.count = this.vertices.length / this.size
  }
  draw(types=this.types) {
    const { gl, count } = this
    for(let type of types) {
      gl.drawArrays(gl[type], 0, count)
    }
  }
}