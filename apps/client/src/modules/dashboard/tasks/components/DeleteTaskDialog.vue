<template>
  <AlertDialog
    :open="dialogState"
    @update:open="(state: boolean) => (dialogState = state)"
  >
    <AlertDialogTrigger as-child>
      <Button size="icon-xs" variant="destructive"><Trash /> </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete this task?</AlertDialogTitle>
        <AlertDialogDescription
          >You won't be able to undo this function</AlertDialogDescription
        >
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button @click="handleDeleteTask" :disabled="loading">
          {{ loading ? "Delete task" : "Confirm" }}
          <Loader2 v-if="loading" class="ml-2 h-4 w-4 animate-spin" />
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { apiClient, useApi } from "@/lib/api.utils";
import { Trash, Loader2 } from "lucide-vue-next";
import { ref } from "vue";
import { toast } from "vue-sonner";

type CompleteTaskDialogProps = {
  id: string;
};

type CompleteTaskDialogEmits = {
  (e: "refresh"): void;
};

const { id } = defineProps<CompleteTaskDialogProps>();
const emit = defineEmits<CompleteTaskDialogEmits>();

const { loading, execute } = useApi();
const dialogState = ref<boolean>(false);

async function handleDeleteTask() {
  const data = {
    param: { id },
  };
  await execute(apiClient.tasks[":id"].$delete, data);
  toast.success("Task completed");
  dialogState.value = false;
  emit("refresh");
}
</script>
