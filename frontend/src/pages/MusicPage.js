import React from "react";
import Music from "../components/ui/Music"; // Our existing Music component

const MusicPage = () => {
  const artistId = "3pepeKuCVRstCagyJZrGfq"; // The ID can live here now
  return (
    <div style={{ paddingTop: "150px" }}>
      <Music artistId={artistId} />
    </div>
  );
};
export default MusicPage;
