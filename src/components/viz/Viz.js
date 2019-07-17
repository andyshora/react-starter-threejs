import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import * as THREE from 'three'

const Container = styled.div`
  width: 1000px;
  height: 800px;
  background: lightGrey;
`

function Viz() {
  const containerEl = useRef(null)

  let cube = useRef(null)
  let scene = useRef(null)
  let camera = useRef(null)
  let renderer = useRef(null)
  let frameId = useRef(null)

  function start() {
    if (!frameId.current) {
      frameId.current = requestAnimationFrame(animate)
    }
  }

  function stop() {
    window.cancelAnimationFrame(frameId.current)
  }

  function renderScene() {
    renderer.current.render(scene.current, camera.current)
  }

  function animate() {
    cube.current.rotation.x += 0.01
    cube.current.rotation.y += 0.01

    renderScene()
    frameId.current = window.requestAnimationFrame(animate)
  }

  useEffect(() => {

    const width = containerEl.current.clientWidth
    const height = containerEl.current.clientHeight

    scene.current = new THREE.Scene()
    camera.current = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    renderer.current = new THREE.WebGLRenderer({ antialias: true })
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: '#ff0000' })
    cube.current = new THREE.Mesh(geometry, material)

    camera.current.position.z = 4
    scene.current.add(cube.current)
    renderer.current.setClearColor('#000000')
    renderer.current.setSize(width, height)

    containerEl.current.appendChild(renderer.current.domElement)
    start()

    return function cleanup() {
      stop()
      if (containerEl.current) {
        containerEl.current.removeChild(renderer.current.domElement)
      }
    }

  }, [])

  return (
    <>
      <Container ref={containerEl} />
      <h1>Viz</h1>
    </>
  )

}

export default Viz
