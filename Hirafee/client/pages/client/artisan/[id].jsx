import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const ArtisanProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [artisanProfile, setArtisanProfile] = useState(null);

  useEffect(() => {
    const fetchArtisanProfile = async () => {
      try {
        const response = await axios.get(`/api/profiles/${id}`);
        setArtisanProfile(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchArtisanProfile();
    }
  }, [id]);

  if (!artisanProfile) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen flex justify-center gap-4 p-4 pt-16">
      <div className="container flex justify-center items-start flex-wrap">
        <div className="border rounded-lg p-4 maxw-136">
          <h2 className="text-2xl font-bold mb-4">{artisanProfile.username}</h2>
          <p className="text-gray-500 mb-2">
            <span className="font-semibold">First Name:</span>{" "}
            {artisanProfile.firstName}
          </p>
          <p className="text-gray-500 mb-2">
            <span className="font-semibold">Last Name:</span>{" "}
            {artisanProfile.lastName}
          </p>
          <p className="text-gray-500 mb-2">
            <span className="font-semibold">Email:</span> {artisanProfile.email}
          </p>
          <p className="text-gray-500 mb-2">
            <span className="font-semibold">Location:</span>{" "}
            {artisanProfile.location}
          </p>
          <p className="text-gray-500 mb-2">
            <span className="font-semibold">Phone:</span>{" "}
            {artisanProfile.phoneNumber}
          </p>
          <p className="text-gray-500 mb-2">
            <span className="font-semibold">Biography:</span>{" "}
            {artisanProfile.biography}
          </p>
          <p className="text-gray-500 mb-2">
            <span className="font-semibold">Category:</span>{" "}
            {artisanProfile.categorie}
          </p>
        </div>
        <div className="mt-8">
          <h3 className="text-4xl font-bold mb-4 text-gray-500 text-center">
            Portfolio
          </h3>
          <div className="flex justify-center flex-wrap gap-4">
            {artisanProfile.portfolio.map((item) => (
              <div key={item.id} className="border rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.description}
                  width={400}
                  height={400}
                  style={{ objectFit: "cover" }}
                />
                <div className="p-4">
                  <p className="text-gray-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ArtisanProfile;
