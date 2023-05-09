class RemoveUniqueIndexFromEvents < ActiveRecord::Migration[6.1]
  def change
    remove_index :events, column: [:name, :start_time], unique: true
  end
end
