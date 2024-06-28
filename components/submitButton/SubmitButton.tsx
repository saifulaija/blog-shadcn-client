
import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { Button } from "../ui/button";

export default function SubmitBtn({ loading }:{loading:any}) {
  return (
    <Button
      type="submit"
      
      disabled={loading}
    >
      {loading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
      ) : (
        <>
          Subscribe
          <FaPaperPlane className="text-xs opacity-70 ml-4 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />{" "}
        </>
      )}
    </Button>
  );
}
