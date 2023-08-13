
export default async function Home() {
  const res = await fetchPosts();
  return (
    <>
      <h1 className="head-text text-left">Home</h1> 
    </>
  )
  
}