import { createTheme, ThemeProvider } from '@suid/material';
import Box from '@suid/material/Box';
import Grid from '@suid/material/Grid';
import SearchIcon from "@suid/icons-material/Search";
import FilterIcon from "@suid/icons-material/FilterAlt";
import TextField from '@suid/material/TextField';
import { Component, createSignal } from 'solid-js';
import { AmbientLight, DirectionalLight, Mesh, MeshPhongMaterial, PlaneGeometry, Scene } from 'three';

import Viewport3D from './Viewport3D';
import MenuBar from './MenuBar';
import ROSBridgeConnectionsProvider from './Connections';
import RobotListProvider from './Robot';
import RobotOverview from './RobotOverview';

const App: Component = () => {
  const [scene, setScene] = createSignal(new Scene());

  const planeGeometry = new PlaneGeometry(100, 100, 100, 100);
  planeGeometry.computeVertexNormals();
  const planeMaterial = new MeshPhongMaterial({
    color: 0x0000f2,
    wireframe: true
  });

  const plane = new Mesh(planeGeometry, planeMaterial);
  // plane.translateOnAxis(new Vector3(1, 0, 1), 5);
  // plane.translateY(-10);
  plane.rotateX(Math.PI * 0.5);
  scene().add(plane);

  const light = new DirectionalLight(0xffffff, 0.8);
  light.position.set(0.1, 1, 2.0);
  scene().add(light);

  const ambientLight = new AmbientLight(0xffffff, 0.3);
  scene().add(ambientLight);

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  // const [selectedIndex, selectIndex] = createSignal<number|null>(null);
  // const [selectedImage, selectImage] = createSignal<string|null>(null);

  return (
    <ThemeProvider theme={theme}>
      <ROSBridgeConnectionsProvider>
        <RobotListProvider>
          <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <MenuBar />
            <Grid container sx={{ flexGrow: 1, overflow: "auto" }}>
              <Grid item md={3} sx={{ height: "100%", padding: "0.5em", display: "flex", flexDirection: "column" }}>
                <RobotOverview />
              </Grid>
              <Grid item md={6} sx={{ height: "100%", padding: "0.5em", display: "flex", flexDirection: "column" }}>
                <Viewport3D connection={null} scene={scene()} style={{ flexGrow: "1", height: "100%" }} />
                {
                  // <Viewport3D scene={scene()} cameraType="orthographic" style={{ flexGrow: "1", height: "100%" }} />
                }
              </Grid>
              <Grid item md={3} sx={{ height: "100%", padding: "0.5em", display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <SearchIcon />
                  <TextField
                    fullWidth
                    variant="standard"
                    placeholder="Filter AoIs"
                  />
                  <FilterIcon />
                </Box>
                {/*
                <ImageList
                  style={{ flexGrow: "1", height: "100%", overflow: "auto" }}
                  connection={connection()}
                  onSelectionChanged={selectImage}
                />
                <Show when={selectedImage() !== null}>
                  <ROSImage
                    connection={connection()}
                    topic={selectedImage() as string}
                    width={200}
                    height={200}
                  />
                </Show>
                */}
              </Grid>
            </Grid>
          </Box>
        </RobotListProvider>
      </ROSBridgeConnectionsProvider>
    </ThemeProvider>
  );
};

export default App;
