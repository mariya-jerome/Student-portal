export default async function StudentPage(
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;

  return (
    <div>
      <h2 className="text-xl font-semibold">Student Details</h2>
      <p>Student ID: {id}</p>
    </div>
  );
}
