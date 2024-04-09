import { useRouteError } from "react-router-dom";

import PageContent from "../components/Layout/PageContent";
import MainHeader from "../components/Layout/MainHeader";

function ErrorLayout() {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <MainHeader />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorLayout;
