"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { WorkersTable } from "./components/workers-table";
import { WorkerForm } from "./components/workers-form";
import { Plus } from "lucide-react";
import { useLanguage } from "@/app/contexts/LanguageContext";

interface Worker {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
}

export default function WorkersPage() {
  const { t } = useLanguage();
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingWorker, setEditingWorker] = useState<Worker | undefined>();

  const handleAddWorker = (data: Omit<Worker, "id">) => {
    const newWorker = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
    };
    setWorkers([...workers, newWorker]);
    setIsFormOpen(false);
  };

  const handleEditWorker = (data: Omit<Worker, "id">) => {
    if (!editingWorker) return;
    const updatedWorkers = workers.map((worker) =>
      worker.id === editingWorker.id ? { ...data, id: worker.id } : worker
    );
    setWorkers(updatedWorkers);
    setEditingWorker(undefined);
  };

  const handleDeleteWorker = (workerId: string) => {
    setWorkers(workers.filter((worker) => worker.id !== workerId));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t?.workers}</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Worker
        </Button>
      </div>

      {(isFormOpen || editingWorker) && (
        <div className="bg-white p-6 rounded-lg shadow">
          <WorkerForm
            initialData={editingWorker}
            onSubmit={editingWorker ? handleEditWorker : handleAddWorker}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingWorker(undefined);
            }}
          />
        </div>
      )}

      <WorkersTable
        workers={workers}
        onEdit={setEditingWorker}
        onDelete={handleDeleteWorker}
      />
    </div>
  );
}
