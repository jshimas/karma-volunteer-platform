// OrganizationEditPage.js
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReusableOrganizationForm from "../../components/OrganizationForm";
import { getOrganization, updateOrganization } from "../../api/organizationApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OrganizationEdit } from "../../models/Organization";
import { SubmitHandler } from "react-hook-form";
import { AxiosError } from "axios";

export default function OrganizationEditPage() {
  const [errorEdit, setErrorEdit] = useState<AxiosError | null>(null);
  const navigate = useNavigate();
  const { organizationId } = useParams();

  const queryClient = useQueryClient();

  const {
    data: organization,
    isPending: isFetchingActivity,
    error,
  } = useQuery({
    queryKey: ["organization", "detail", organizationId],
    queryFn: async () =>
      await getOrganization({
        params: { id: organizationId! },
      }),
  });

  const editOrganizationMutation = useMutation({
    mutationFn: async (orgnaizationEdit: OrganizationEdit) =>
      await updateOrganization({
        data: orgnaizationEdit,
        params: { id: organizationId! },
      }),
    onSuccess: async () =>
      await queryClient.invalidateQueries({
        queryKey: ["organization", "detail", organizationId],
      }),
  });

  const onSubmit: SubmitHandler<OrganizationEdit> = async (data) => {
    try {
      await editOrganizationMutation.mutate(data);
      navigate(`/organizations/${organizationId}`);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        setErrorEdit(error);
      }
    }
  };

  if (isFetchingActivity) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-4/5 lg:w-2/3 text-slate-800 m-12">
      <ReusableOrganizationForm
        onSubmit={onSubmit}
        isSubmitting={editOrganizationMutation.isPending}
        defaultValues={organization}
      />
      {error && <p>{error.message}</p>}
      {errorEdit && <p>{errorEdit.message}</p>}
    </div>
  );
}
