import ConfirmationModal from "@/components/Modals/ConfirmationModal";
import SavePasswordDialog from "@/components/Modals/SavePasswordDialog";
import PasswordList from "@/components/main/PasswordList";
import { SERVER_URL } from "@/constants";
import { useDebounce } from "@/hooks/useDebounce";
import axiosJWT from "@/utils/axiosJwt";
import showToast from "@/utils/showToast";
import { Loader } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export type PasswordInteface = {
  _id: string;
  name: string;
  password: string;
};

const SavedPasswords = () => {
  const [passwords, setPasswords] = useState<PasswordInteface[]>([]);
  const [itemToDelete, setItemTodelete] = useState<string>("");
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit] = useState<PasswordInteface | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const debounced = useDebounce(query);

  useEffect(() => {
    setPage(1);
    setPasswords([]);
  }, [query]);
  useEffect(() => {
    page > 1 ? setIsLoadingMore(true) : setIsLoading(true);
    axiosJWT
      .get(`${SERVER_URL}/passwords`, {
        params: {
          q: query.trim(),
          page,
        },
      })
      .then(({ data }) => {
        setPasswords((prev) => [...prev, ...data.passwords]);
        setHasMore(data?.passwords?.length > 0);
      })
      .catch(() => showToast("Could not fetch passwords", "error"))
      .finally(() =>
        page > 1 ? setIsLoadingMore(false) : setIsLoading(false)
      );
  }, [debounced, page]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("Password Copied to clipboard");
  };

  const handleDelete = (id: string) => {
    setItemTodelete(id);
    setShowConfirmationModal(true);
  };
  const handleEdit = (data: PasswordInteface) => {
    setShowEditModal(true);
    setItemToEdit(data);
  };

  const updateEditedPassword = (data: PasswordInteface) => {
    setPasswords((curr) =>
      curr.filter((p) => {
        if (p._id === data._id) {
          p.name = data.name;
          p.password = data.password;
        }
        return p;
      })
    );
  };

  const observer = useRef<IntersectionObserver>();
  const lastItem = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isLoadingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, isLoadingMore, hasMore]
  );

  const handleConfirmation = () => {
    axiosJWT
      .delete(`${SERVER_URL}/passwords/${itemToDelete}`)
      .then(({ data }) => showToast(data.message))
      .catch(() => showToast("Couldn't delete password", "error"));
    setPasswords((curr) => curr.filter((p) => p._id !== itemToDelete));
    setShowConfirmationModal(false);
  };

  const handleCancel = () => {
    setItemTodelete("");
    setShowConfirmationModal(false);
  };

  return (
    <div className="flex justify-center items-center custom-vh bg-gray-100">
      <div className="w-[380px] bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Password Manager</h1>
        <input
          type="search"
          className="px-3 py-2 w-full border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="grid gap-4 max-h-[300px] overflow-y-auto p-2">
          {isLoading ? (
            <>
              <div className="flex items-center justify-center">
                <Loader className="h-5 w-5 animate-spin" />
              </div>
            </>
          ) : (
            <>
              {passwords.length ? (
                <>
                  {passwords.map((password, index) => {
                    if (passwords.length === index + 1) {
                      return (
                        <PasswordList
                          {...password}
                          ref={lastItem}
                          key={index}
                          handleCopy={handleCopy}
                          handleDelete={handleDelete}
                          handleEdit={() => handleEdit(password)}
                        />
                      );
                    } else {
                      return (
                        <PasswordList
                          {...password}
                          key={index}
                          handleCopy={handleCopy}
                          handleDelete={handleDelete}
                          handleEdit={() => handleEdit(password)}
                        />
                      );
                    }
                  })}
                </>
              ) : (
                <>
                  <h1 className="text-xl text-nuetralBlue font-oswald">
                    No Saved Passwords
                  </h1>
                </>
              )}
            </>
          )}
        </div>
      </div>
      {showConfirmationModal && (
        <ConfirmationModal
          handleConfirmation={handleConfirmation}
          handleCancel={handleCancel}
        />
      )}

      {showEditModal && itemToEdit && (
        <SavePasswordDialog
          setShow={setShowEditModal}
          passwordInfo={itemToEdit}
          action="update"
          updatedPassword={updateEditedPassword}
        />
      )}
    </div>
  );
};

export default SavedPasswords;
